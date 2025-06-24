package vidasana.tpo.habitos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidasana.tpo.habitos.model.HabitoDiario;
import vidasana.tpo.habitos.repository.HabitoDiarioRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class HabitoDiarioService {
    @Autowired
    private HabitoDiarioRepository habitoDiarioRepository;

    public static final String[] OPCIONES_ALIMENTACION = {"3 comidas", "2 comidas", "salteado", "vegetariano"};
    public static final String[][] POSIBLES_SINTOMAS = {
            {},
            {"fiebre"},
            {"dolor de cabeza"},
            {"tos", "dolor garganta"},
            {"fiebre", "náuseas"}
    };

    public HabitoDiario crearHabito(String pacienteId, HabitoDiario habito) {
        habito.setPacienteId(pacienteId);
        if (habito.getFecha() == null) {
            habito.setFecha(LocalDate.now());
        }
        return habitoDiarioRepository.save(habito);
    }

    public List<HabitoDiario> obtenerPorPaciente(String pacienteId) {
        return habitoDiarioRepository.findByPacienteIdOrderByFechaDesc(pacienteId);
    }
    public List<HabitoDiario> simularHabitos(String pacienteId, int dias) {
        List<HabitoDiario> simulados = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < dias; i++) {
            HabitoDiario h = new HabitoDiario();
            h.setPacienteId(pacienteId);
            h.setFecha(LocalDate.now().minusDays(i));

            h.setSueno(4 + random.nextInt(5)); // de 4 a 8 hs

            // Generar alimentación
            h.setAlimentacion(OPCIONES_ALIMENTACION[random.nextInt(OPCIONES_ALIMENTACION.length)]);

            // Generar síntomas con posibilidad de sentirse bien
            if (random.nextInt(100) < 50) { // 50% de probabilidad de no tener síntomas
                h.setSintomas(new ArrayList<>());
            } else {
                h.setSintomas(List.of(POSIBLES_SINTOMAS[random.nextInt(POSIBLES_SINTOMAS.length)]));
                simulados.add(h);
                habitoDiarioRepository.save(h);
            }


        }

        return simulados;
    }

    public String[] getOpcionesAlimentacion() {
        return OPCIONES_ALIMENTACION;
    }

    public String[][] getPosiblesSintomas() {
        return POSIBLES_SINTOMAS;
    }
}
