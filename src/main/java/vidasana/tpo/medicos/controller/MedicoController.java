package vidasana.tpo.medicos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.medicos.model.Medico;
import vidasana.tpo.medicos.service.MedicoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")

public class MedicoController {
    @Autowired
    MedicoService medicoService;

    @PostMapping("/medicos")
    public ResponseEntity<Medico> crearMedico(@RequestBody Medico request) {
        Medico medicoGuardado = medicoService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(medicoGuardado);
    }
    @GetMapping("/medicos")
    public ResponseEntity<List<Medico>> obtenerMedicos() {
        return ResponseEntity.ok(medicoService.obtenerTodos());
    }
}
