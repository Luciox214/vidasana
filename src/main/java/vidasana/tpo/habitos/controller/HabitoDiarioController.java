package vidasana.tpo.habitos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.habitos.model.HabitoDiario;
import vidasana.tpo.habitos.service.HabitoDiarioService;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pacientes/{pacienteId}")
public class HabitoDiarioController {
    @Autowired
    private HabitoDiarioService habitoDiarioService;

    @PostMapping("/habitos")
    public ResponseEntity<HabitoDiario> cargarHabito(
            @PathVariable String pacienteId,
            @RequestBody HabitoDiario habito) {
        return ResponseEntity.ok(habitoDiarioService.crearHabito(pacienteId, habito));
    }

    @GetMapping("/habitos")
    public ResponseEntity<List<HabitoDiario>> listarHabitos(@PathVariable String pacienteId) {
        return ResponseEntity.ok(habitoDiarioService.obtenerPorPaciente(pacienteId));
    }

    @PostMapping("/simular")
    public ResponseEntity<List<HabitoDiario>> simularHabitos(@PathVariable String pacienteId) {
        return ResponseEntity.ok(habitoDiarioService.simularHabitos(pacienteId, 30));
    }

}
