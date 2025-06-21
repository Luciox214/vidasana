package vidasana.tpo.red.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.red.model.MedicoNode;
import vidasana.tpo.red.model.PacienteNode;
import vidasana.tpo.red.service.RedMedicaService;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/red")
public class RedMedicaController {
    @Autowired
    RedMedicaService redService;

    @GetMapping("/paciente/medicos")
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<Set<MedicoNode>> listarMedicos(Authentication authentication) {
        String pacienteId = authentication.getPrincipal().toString();
        return ResponseEntity.ok(redService.listarMedicosDePaciente(pacienteId));
    }
    @GetMapping("/medico/pacientes")
    @PreAuthorize("hasRole('MEDICO')")
    public ResponseEntity<Set<PacienteNode>> listarPacientes(Authentication authentication) {
        return ResponseEntity.ok(redService.listarPacientesDeMedico(authentication.getPrincipal().toString()));
    }
}