package vidasana.tpo.risk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidasana.tpo.pacientes.model.Paciente;
import vidasana.tpo.pacientes.repository.PacienteRepository;
import vidasana.tpo.habitos.service.HabitoDiarioService;
import vidasana.tpo.habitos.model.HabitoDiario;
import vidasana.tpo.risk.model.RiskScore;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class RiskService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private HabitoDiarioService habitoDiarioService;

    public RiskScore calcularRiesgo(String pacienteId) {
        Paciente paciente = pacienteRepository.findById(pacienteId).orElse(null);
        if (paciente == null) return null;

        // Obtener hábitos recientes (últimos 30 más nuevos)
        List<HabitoDiario> habitosRecientes = habitoDiarioService.obtenerPorPaciente(pacienteId).stream()
                .sorted(Comparator.comparing(HabitoDiario::getFecha).reversed())
                .limit(30)
                .toList();

        RiskScore score = new RiskScore();
        score.setPacienteId(pacienteId);
        score.setFechaCalculo(LocalDateTime.now());

        int edad = Period.between(paciente.getFechaNacimiento(), LocalDateTime.now().toLocalDate()).getYears();

        score.setRiesgoCardiovascular(calcularRiesgoCardiovascular(paciente, edad, habitosRecientes));
        score.setRiesgoDiabetes(calcularRiesgoDiabetes(paciente, edad, habitosRecientes));
        score.setRiesgoObesidad(calcularRiesgoObesidad(paciente, habitosRecientes));

        int riesgoPromedio = (score.getRiesgoCardiovascular() + score.getRiesgoDiabetes() + score.getRiesgoObesidad()) / 3;
        if (riesgoPromedio < 30) score.setNivelRiesgo("BAJO");
        else if (riesgoPromedio < 70) score.setNivelRiesgo("MEDIO");
        else score.setNivelRiesgo("ALTO");

        score.setRecomendaciones(generarRecomendaciones(score, habitosRecientes));
        return score;
    }

    private int calcularRiesgoCardiovascular(Paciente paciente, int edad, List<HabitoDiario> habitos) {
        int riesgo = 0;

        if (edad > 60) riesgo += 30;
        else if (edad > 45) riesgo += 20;
        else if (edad > 35) riesgo += 10;

        if (paciente.getHistoriaClinica() != null &&
                paciente.getHistoriaClinica().getAntecedentesFamiliares() != null) {
            List<String> antecedentes = paciente.getHistoriaClinica().getAntecedentesFamiliares();
            if (antecedentes.contains("infarto") || antecedentes.contains("cardiovascular")) riesgo += 40;
            else if (antecedentes.contains("hipertension")) riesgo += 25;
        }

        if (paciente.getHistoriaClinica() != null &&
                paciente.getHistoriaClinica().getImc() != null) {
            double imc = paciente.getHistoriaClinica().getImc();
            if (imc > 30) riesgo += 20;
            else if (imc > 25) riesgo += 10;
        }

        if (!habitos.isEmpty()) {
            double promedioSueno = habitos.stream()
                    .mapToInt(HabitoDiario::getSueno)
                    .average()
                    .orElse(7);

            if (promedioSueno < 5) riesgo += 15;
            else if (promedioSueno < 6) riesgo += 10;

            long diasConSintomas = habitos.stream()
                    .filter(h -> h.getSintomas() != null && !h.getSintomas().isEmpty())
                    .count();

            if (diasConSintomas > 10) riesgo += 10;
        }

        return Math.min(riesgo, 100);
    }

    private int calcularRiesgoDiabetes(Paciente paciente, int edad, List<HabitoDiario> habitos) {
        int riesgo = 0;

        if (edad > 45) riesgo += 25;

        if (paciente.getHistoriaClinica() != null &&
                paciente.getHistoriaClinica().getAntecedentesFamiliares() != null) {
            List<String> antecedentes = paciente.getHistoriaClinica().getAntecedentesFamiliares();
            if (antecedentes.contains("diabetes")) riesgo += 50;
        }

        if (paciente.getHistoriaClinica() != null &&
                paciente.getHistoriaClinica().getImc() != null) {
            double imc = paciente.getHistoriaClinica().getImc();
            if (imc > 30) riesgo += 25;
        }

        if (!habitos.isEmpty()) {
            long diasAlimentacionIrregular = habitos.stream()
                    .filter(h -> h.getAlimentacion() != null &&
                            (h.getAlimentacion().contains("salteado") || h.getAlimentacion().contains("2 comidas")))
                    .count();

            if (diasAlimentacionIrregular > 15) riesgo += 15;
        }

        return Math.min(riesgo, 100);
    }

    private int calcularRiesgoObesidad(Paciente paciente, List<HabitoDiario> habitos) {
        int riesgo = 0;

        if (paciente.getHistoriaClinica() != null &&
                paciente.getHistoriaClinica().getImc() != null) {
            double imc = paciente.getHistoriaClinica().getImc();
            if (imc > 35) riesgo = 80;
            else if (imc > 30) riesgo = 60;
            else if (imc > 25) riesgo = 30;
            else if (imc < 18.5) riesgo = 20;
        }

        if (!habitos.isEmpty()) {
            long diasMalaAlimentacion = habitos.stream()
                    .filter(h -> h.getAlimentacion() != null && h.getAlimentacion().contains("salteado"))
                    .count();

            if (diasMalaAlimentacion > 10) riesgo += 20;
        }

        return Math.min(riesgo, 100);
    }

    private List<String> generarRecomendaciones(RiskScore score, List<HabitoDiario> habitos) {
        List<String> recomendaciones = new ArrayList<>();

        if (score.getRiesgoCardiovascular() > 50) {
            recomendaciones.add("Consulta cardiológica preventiva");
        }
        if (score.getRiesgoDiabetes() > 50) {
            recomendaciones.add("Control de glucemia");
            recomendaciones.add("Regularizar horarios de comida");
        }
        if (score.getRiesgoObesidad() > 50) {
            recomendaciones.add("Plan nutricional personalizado");
        }

        if (!habitos.isEmpty()) {
            double promedioSueno = habitos.stream()
                    .mapToInt(HabitoDiario::getSueno)
                    .average()
                    .orElse(7);

            if (promedioSueno < 6) {
                recomendaciones.add("Mejorar higiene del sueño - dormir al menos 7 horas");
            }
        }

        return recomendaciones;
    }
}