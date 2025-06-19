package vidasana.tpo.medicos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.medicos.model.Medico;
import vidasana.tpo.medicos.service.MedicoService;
import java.util.List;

@RestController
@RequestMapping("/api/v1/medicos")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MedicoController {
    @Autowired
    private MedicoService medicoService;

    @GetMapping
    public List<Medico> getAllMedicos() {
        return medicoService.obtenerTodos();
    }
}
