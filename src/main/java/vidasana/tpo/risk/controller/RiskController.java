package vidasana.tpo.risk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.pacientes.model.Paciente;
import vidasana.tpo.pacientes.repository.PacienteRepository;
import vidasana.tpo.habitos.service.HabitoDiarioService;
import vidasana.tpo.risk.model.HistoriaClinica;
import vidasana.tpo.risk.model.RiskScore;
import vidasana.tpo.risk.repository.RiskRepository;
import vidasana.tpo.risk.service.RiskService;

import java.util.*;

@RestController
@RequestMapping("/api/v1/riesgos")
public class RiskController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private HabitoDiarioService habitoDiarioService;

    @Autowired
    private RiskService riskService;

    @Autowired
    private RiskRepository riskRepository;

    @PostMapping("/carga-masiva")
    public ResponseEntity<String> cargaMasiva() {
        List<Paciente> pacientes = pacienteRepository.findAll();

        if (pacientes.isEmpty()) {
            return ResponseEntity.badRequest().body("No hay pacientes en la BD");
        }

        Random random = new Random();
        String[] antecedentesFamiliares = {"diabetes", "hipertension", "cardiovascular", "infarto", "ninguno"};
        String[] enfermedadesCronicas = {"hipertension", "diabetes tipo 2", "asma", "ninguna"};
        String[] alergias = {"penicilina", "mariscos", "polen", "ninguna"};

        int pacientesActualizados = 0;

        for (Paciente paciente : pacientes) {
            if (paciente.getHistoriaClinica() != null) {
                continue; // Saltar pacientes con historia clínica existente
            }

            // Crear historia clínica aleatoria
            HistoriaClinica historia = new HistoriaClinica();

            // Antecedentes familiares (1-3 aleatorios)
            List<String> antecedentesSelected = new ArrayList<>();
            for (int i = 0; i < 1 + random.nextInt(3); i++) {
                String antecedente = antecedentesFamiliares[random.nextInt(antecedentesFamiliares.length)];
                if (!antecedentesSelected.contains(antecedente)) {
                    antecedentesSelected.add(antecedente);
                }
            }
            historia.setAntecedentesFamiliares(antecedentesSelected);

            // Enfermedades crónicas
            historia.setEnfermedadesCronicas(
                    Arrays.asList(enfermedadesCronicas[random.nextInt(enfermedadesCronicas.length)])
            );

            // Alergias
            historia.setAlergias(
                    Arrays.asList(alergias[random.nextInt(alergias.length)])
            );

            // IMC aleatorio (18-40)
            historia.setImc(18.0 + random.nextDouble() * 22.0);

            // Grupo sanguíneo
            String[] grupos = {"A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"};
            historia.setGrupoSanguineo(grupos[random.nextInt(grupos.length)]);

            paciente.setHistoriaClinica(historia);
            pacienteRepository.save(paciente);

            // Generar hábitos para los últimos 30 días
            habitoDiarioService.simularHabitos(paciente.getId(), 30);
            pacientesActualizados++;
        }
        return ResponseEntity.ok("Datos de prueba cargados para " + pacientesActualizados + " pacientes");
    }

    @PostMapping("/calculo-masivo")
    public ResponseEntity<String> calcularTodosLosRiesgos() {
        List<Paciente> pacientes = pacienteRepository.findAll();
        int riscosCalculados = 0;

        for (Paciente paciente : pacientes) {
            if (paciente.getHistoriaClinica() == null) {
                continue; // Saltar pacientes sin historia clínica
            }

            RiskScore score = riskService.calcularRiesgo(paciente.getId());
            if (score != null) {
                riskRepository.save(score);
                riscosCalculados++;
            }
        }

        return ResponseEntity.ok("Riesgos calculados para " + riscosCalculados + " pacientes");
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        Map<String, Object> summary = new HashMap<>();
        List<Paciente> pacientes = pacienteRepository.findAll();
        List<RiskScore> riskScores = riskRepository.findAll();

        summary.put("totalPacientes", pacientes.size());
        summary.put("totalRiskScores", riskScores.size());

        long altosRiesgos = riskScores.stream()
                .filter(r -> "ALTO".equals(r.getNivelRiesgo()))
                .count();
        long riesgosMedios = riskScores.stream()
                .filter(r -> "MEDIO".equals(r.getNivelRiesgo()))
                .count();
        long riesgosBajos = riskScores.stream()
                .filter(r -> "BAJO".equals(r.getNivelRiesgo()))
                .count();

        summary.put("pacientesAltoRiesgo", altosRiesgos);
        summary.put("pacientesMedioRiesgo", riesgosMedios);
        summary.put("pacientesBajoRiesgo", riesgosBajos);

        return ResponseEntity.ok(summary);
    }
}