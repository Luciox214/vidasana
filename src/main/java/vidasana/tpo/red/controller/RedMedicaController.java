package vidasana.tpo.red.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.medicos.model.MedicoNode;
import vidasana.tpo.pacientes.model.PacienteNode;
import vidasana.tpo.red.service.RedMedicaService;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/red")
public class RedMedicaController {
    @Autowired
    RedMedicaService redService;

    @PostMapping("/asignar")
    public ResponseEntity<String> asignarMedicoAPaciente(
            @RequestParam String idMedico,
            @RequestParam String idPaciente) {
        redService.crearRelacion(idMedico, idPaciente);
        return ResponseEntity.ok("Relación creada");
    }

    @GetMapping("/medico/{id}/pacientes")
    public ResponseEntity<Set<PacienteNode>> listarPacientes(@PathVariable String id) {
        return ResponseEntity.ok(redService.listarPacientesDeMedico(id));
    }

    @GetMapping("/medicos")
    public ResponseEntity<List<MedicoNode>> obtenerMedicos() {
        return ResponseEntity.ok(redService.obtenerMedicos());
    }

}