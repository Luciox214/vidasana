package vidasana.tpo.pacientes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.habitos.model.HabitoDiario;
import vidasana.tpo.habitos.service.HabitoDiarioService;
import vidasana.tpo.pacientes.model.Paciente;
import vidasana.tpo.pacientes.service.PacienteService;
import vidasana.tpo.risk.model.HistoriaClinica;
import vidasana.tpo.risk.model.RiskScore;
import vidasana.tpo.risk.repository.RiskRepository;
import vidasana.tpo.risk.service.RiskService;
import vidasana.tpo.red.service.RedMedicaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/pacientes")
public class PacienteController {
    @Autowired
    private HabitoDiarioService habitoDiarioService;
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private RiskService riskService;
    @Autowired
    private RiskRepository riskRepository;
    @Autowired
    private RedMedicaService redService;

    @PostMapping("/habitos")
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<HabitoDiario> cargarHabito(
            @RequestBody HabitoDiario habito,
            Authentication authentication) {
        String pacienteId = (String) authentication.getPrincipal();
        habito.setPacienteId(pacienteId);
        return ResponseEntity.ok(habitoDiarioService.crearHabito(pacienteId, habito));
    }

    // Obtener historia clínica del paciente autenticado o por ID (médico o paciente)
    @GetMapping("/historia")
    @PreAuthorize("hasAnyRole('MEDICO','PACIENTE')")
    public ResponseEntity<HistoriaClinica> obtenerHistoria(Authentication authentication, @RequestParam(value = "id", required = false) String id) {
        String pacienteId = id != null ? id : (String) authentication.getPrincipal();
        Optional<Paciente> pacienteOpt = pacienteService.obtenerPorId(pacienteId);
        if (pacienteOpt.isEmpty()) return ResponseEntity.notFound().build();
        Paciente paciente = pacienteOpt.get();
        HistoriaClinica historia = paciente.getHistoriaClinica();
        if (historia == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(historia);
    }

    // Obtener hábitos del paciente autenticado o por ID (médico o paciente)
    @GetMapping("/habitos")
    @PreAuthorize("hasAnyRole('MEDICO','PACIENTE')")
    public ResponseEntity<List<HabitoDiario>> listarHabitos(Authentication authentication, @RequestParam(value = "id", required = false) String id) {
        String pacienteId = id != null ? id : (String) authentication.getPrincipal();
        return ResponseEntity.ok(habitoDiarioService.obtenerPorPaciente(pacienteId));
    }

    // Obtener riesgo del paciente autenticado o por ID (médico o paciente)
    @GetMapping("/riesgo")
    @PreAuthorize("hasAnyRole('MEDICO','PACIENTE')")
    public ResponseEntity<?> calcularRiesgo(Authentication authentication, @RequestParam(value = "id", required = false) String id) {
        String pacienteId = id != null ? id : (String) authentication.getPrincipal();
        RiskScore score = riskService.calcularRiesgo(pacienteId);
        if (score == null) return ResponseEntity.notFound().build();
        riskRepository.save(score); // Guardar el score calculado
        return ResponseEntity.ok(score);
    }

    // Obtener historia clínica de un paciente por ID (cualquier médico)
    @GetMapping("/{id}/historia")
    public ResponseEntity<HistoriaClinica> obtenerHistoriaPorId(@PathVariable String id) {
        Optional<Paciente> pacienteOpt = pacienteService.obtenerPorId(id);
        if (pacienteOpt.isEmpty()) return ResponseEntity.notFound().build();
        Paciente paciente = pacienteOpt.get();
        HistoriaClinica historia = paciente.getHistoriaClinica();
        if (historia == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(historia);
    }

    // Obtener riesgo de un paciente por ID (cualquier médico)
    @GetMapping("/{id}/riesgo")
    public ResponseEntity<?> obtenerRiesgoPorId(@PathVariable String id) {
        RiskScore score = riskService.calcularRiesgo(id);
        if (score == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(score);
    }

    @PutMapping("/historia")
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<?> actualizarHistoria(Authentication authentication, @RequestBody HistoriaClinica historia) {
        String pacienteId = (String) authentication.getPrincipal();
        Optional<Paciente> pacienteOpt = pacienteService.obtenerPorId(pacienteId);
        if (pacienteOpt.isEmpty()) return ResponseEntity.notFound().build();
        Paciente paciente = pacienteOpt.get();
        paciente.setHistoriaClinica(historia);
        pacienteService.actualizarPaciente(paciente);
        return ResponseEntity.ok().build();
    }
}
