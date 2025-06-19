package vidasana.tpo.dashboard.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vidasana.tpo.habitos.service.HabitoDiarioService;
import vidasana.tpo.medicos.model.Medico;
import vidasana.tpo.medicos.repository.MedicoRepository;
import vidasana.tpo.pacientes.model.Paciente;
import vidasana.tpo.pacientes.repository.PacienteRepository;
import vidasana.tpo.red.model.PacienteNode;
import vidasana.tpo.red.repositories.RedRepository;
import vidasana.tpo.risk.model.RiskScore;
import vidasana.tpo.risk.repository.RiskRepository;

import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final RedRepository redRepository;
    private final PacienteRepository pacienteRepository;
    private final RiskRepository riskRepository;
    private final MedicoRepository medicoRepository;
    private final HabitoDiarioService habitoService;

    public Map<String, Object> obtenerDashboard(String medicoId) {
        Set<String> sintomas = new HashSet<>();
        AtomicInteger riesgoAlto = new AtomicInteger();
        AtomicReference<Double> imcAcumulado = new AtomicReference<>(0.0);

        List<Map<String, Object>> pacientesInfo = new ArrayList<>();
        Map<String, Integer> otrosMedicosRelacionados = new HashMap<>();

        redRepository.listarPacientesDeMedico(medicoId).forEach(node ->
                pacienteRepository.findById(node.getId()).ifPresent(paciente -> {
                    RiskScore score = obtenerUltimoScore(paciente.getId());
                    if (score == null) return;

                    if ("ALTO".equals(score.getNivelRiesgo())) riesgoAlto.incrementAndGet();
                    imcAcumulado.updateAndGet(v -> v + obtenerIMC(paciente));

                    agregarSintomas(paciente.getId(), sintomas);
                    agregarMedicosRelacionados(node, medicoId, otrosMedicosRelacionados);

                    pacientesInfo.add(crearInfoPaciente(paciente, score));
                })
        );

        return crearDashboard(medicoId, pacientesInfo, otrosMedicosRelacionados, sintomas, riesgoAlto.get(), imcAcumulado.get());
    }

    private RiskScore obtenerUltimoScore(String pacienteId) {
        return riskRepository.findByPacienteId(pacienteId).stream()
                .filter(Objects::nonNull)
                .max(Comparator.comparing(RiskScore::getFechaCalculo))
                .orElse(null);
    }

    private double obtenerIMC(Paciente paciente) {
        return Optional.ofNullable(paciente.getHistoriaClinica())
                .map(h -> h.getImc())
                .orElse(0.0);
    }

    private void agregarSintomas(String pacienteId, Set<String> sintomas) {
        habitoService.obtenerPorPaciente(pacienteId).stream()
                .flatMap(h -> Optional.ofNullable(h.getSintomas()).stream().flatMap(Collection::stream))
                .forEach(sintomas::add);
    }

    private void agregarMedicosRelacionados(PacienteNode node, String medicoId, Map<String, Integer> otrosMedicosRelacionados) {
        node.getMedicos().stream()
                .map(rel -> rel.getMedico())
                .filter(m -> !m.getId().equals(medicoId))
                .forEach(m -> otrosMedicosRelacionados.merge(m.getId(), 1, Integer::sum));
    }

    private Map<String, Object> crearInfoPaciente(Paciente paciente, RiskScore score) {
        return Map.of(
                "id", paciente.getId(),
                "nombre", paciente.getNombre(),
                "edad", Period.between(paciente.getFechaNacimiento(), LocalDate.now()).getYears(),
                "riesgo", score.getNivelRiesgo(),
                "ultimaConsulta", score.getFechaCalculo().toLocalDate().toString()
        );
    }

    private Map<String, Object> crearDashboard(String medicoId, List<Map<String, Object>> pacientesInfo,
                                               Map<String, Integer> otrosMedicosRelacionados, Set<String> sintomas,
                                               int riesgoAlto, double imcAcumulado) {
        double promedioIMC = pacientesInfo.isEmpty() ? 0 : Math.round((imcAcumulado / pacientesInfo.size()) * 10.0) / 10.0;

        List<Map<String, Object>> medicosRelacionados = otrosMedicosRelacionados.entrySet().stream()
                .map(entry -> Map.of(
                        "id", (Object) entry.getKey(),
                        "nombre", (Object) medicoRepository.findById(entry.getKey()).map(Medico::getNombre).orElse("Desconocido"),
                        "pacientesCompartidos", (Object) entry.getValue()
                )).toList();

        return Map.of(
                "medicoId", medicoId,
                "nombre", medicoRepository.findById(medicoId).map(Medico::getNombre).orElse("Desconocido"),
                "totalPacientes", pacientesInfo.size(),
                "pacientesRiesgoAlto", riesgoAlto,
                "riesgoPromedio", calcularPromedioNivel(pacientesInfo),
                "promedioIMC", promedioIMC,
                "sintomasFrecuentes", new ArrayList<>(sintomas),
                "pacientes", pacientesInfo,
                "otrosMedicosRelacionados", medicosRelacionados
        );
    }

    private String calcularPromedioNivel(List<Map<String, Object>> pacientes) {
        Map<String, Integer> pesos = Map.of("BAJO", 1, "MEDIO", 2, "ALTO", 3);
        int total = pacientes.stream()
                .map(p -> (String) p.get("riesgo"))
                .mapToInt(n -> pesos.getOrDefault(n, 2))
                .sum();
        int promedio = pacientes.isEmpty() ? 0 : total / pacientes.size();
        return promedio == 1 ? "BAJO" : promedio == 3 ? "ALTO" : "MEDIO";
    }
}