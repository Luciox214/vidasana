package vidasana.tpo.habitos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.habitos.model.HabitoDiario;
import vidasana.tpo.habitos.service.HabitoDiarioService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pacientes")
public class HabitoDiarioController {

    @Autowired
    private HabitoDiarioService habitoDiarioService;

    @PostMapping("/habitos")
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<HabitoDiario> cargarHabito(
            @RequestBody HabitoDiario habito,
            Authentication authentication) {
        String pacienteId = (String) authentication.getPrincipal();
        habito.setPacienteId(pacienteId);
        return ResponseEntity.ok(habitoDiarioService.crearHabito(pacienteId, habito));
    }

    @GetMapping("/habitos")
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<List<HabitoDiario>> listarHabitos(Authentication authentication) {
        String pacienteId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(habitoDiarioService.obtenerPorPaciente(pacienteId));
    }

    @PostMapping("/simular")
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<List<HabitoDiario>> simularHabitos(Authentication authentication) {
        String pacienteId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(habitoDiarioService.simularHabitos(pacienteId, 30));
    }
}
