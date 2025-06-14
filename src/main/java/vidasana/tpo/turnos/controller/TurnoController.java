package vidasana.tpo.turnos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.turnos.model.Turno;
import vidasana.tpo.turnos.service.TurnoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/turnos")
public class TurnoController {

    @Autowired
    private TurnoService turnoService;
    @PostMapping
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<Turno> solicitarTurno(@RequestBody Turno turno, Authentication auth) {
        turno.setPacienteId((String) auth.getPrincipal());
        turno.setEstado("PENDIENTE");
        return ResponseEntity.ok(turnoService.crearTurnoYActualizarRed(turno));
    }

    @GetMapping()
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<List<Turno>> verTurnosPaciente(Authentication auth) {
        return ResponseEntity.ok(turnoService.obtenerPorPaciente((String) auth.getPrincipal()));
    }
    @GetMapping("/medico")
    @PreAuthorize("hasRole('MEDICO')")
    public ResponseEntity<List<Turno>> verTurnosMedico(Authentication auth) {
        return ResponseEntity.ok(turnoService.obtenerPorMedico((String) auth.getPrincipal()));
    }

}
