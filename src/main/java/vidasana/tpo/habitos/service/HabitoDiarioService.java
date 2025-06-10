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

        String[] opcionesAlimentacion = {"3 comidas", "2 comidas", "salteado", "vegetariano"};
        String[][] posiblesSintomas = {
                {},
                {"fiebre"},
                {"dolor de cabeza"},
                {"tos", "dolor garganta"},
                {"fiebre", "náuseas"}
        };

        for (int i = 0; i < dias; i++) {
            HabitoDiario h = new HabitoDiario();
            h.setPacienteId(pacienteId);
            h.setFecha(LocalDate.now().minusDays(i));
            h.setSueno(4 + random.nextInt(5)); // de 4 a 8 hs
            h.setAlimentacion(opcionesAlimentacion[random.nextInt(opcionesAlimentacion.length)]);
            h.setSintomas(List.of(posiblesSintomas[random.nextInt(posiblesSintomas.length)]));
            simulados.add(h);
        }

        return habitoDiarioRepository.saveAll(simulados);
    }
}
