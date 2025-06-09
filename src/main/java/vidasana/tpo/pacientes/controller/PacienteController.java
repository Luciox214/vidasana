package vidasana.tpo.pacientes.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.pacientes.model.Paciente;
import vidasana.tpo.pacientes.service.PacienteService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class PacienteController {
    @Autowired
    PacienteService pacienteService;

    @PostMapping("/pacientes")
    public ResponseEntity<Paciente> crearPaciente(@RequestBody Paciente request) {
        Paciente pacienteGuardado = pacienteService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteGuardado);
    }

    @GetMapping("/pacientes")
    public ResponseEntity<List<Paciente>> obtenerPacientes() {
        return ResponseEntity.ok(pacienteService.obtenerTodos());
    }
}
