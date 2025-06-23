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

    // Cargar o actualizar historia clínica
    @PutMapping("/historia")
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<Paciente> actualizarHistoria(
            @RequestBody HistoriaClinica historia,
            Authentication authentication) {
        String pacienteId = (String) authentication.getPrincipal();
        Optional<Paciente> pacienteOpt = pacienteService.obtenerPorId(pacienteId);
        if (pacienteOpt.isEmpty()) return ResponseEntity.notFound().build();

        Paciente paciente = pacienteOpt.get();
        paciente.setHistoriaClinica(historia);
        pacienteService.actualizarPaciente(paciente);
        return ResponseEntity.ok(paciente);
    }

    // Calcular y ver riesgo
    @GetMapping("/riesgo")
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<?> calcularRiesgo(Authentication authentication) {
        String pacienteId = (String) authentication.getPrincipal();
        RiskScore score = riskService.calcularRiesgo(pacienteId);
        if (score == null) return ResponseEntity.notFound().build();
        riskRepository.save(score); // Guardar el score calculado
        return ResponseEntity.ok(score);
    }

    // Obtener historia clínica del paciente autenticado
    @GetMapping("/historia")
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<HistoriaClinica> obtenerHistoria(Authentication authentication) {
        String pacienteId = (String) authentication.getPrincipal();
        Optional<Paciente> pacienteOpt = pacienteService.obtenerPorId(pacienteId);
        if (pacienteOpt.isEmpty()) return ResponseEntity.notFound().build();
        Paciente paciente = pacienteOpt.get();
        HistoriaClinica historia = paciente.getHistoriaClinica();
        if (historia == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(historia);
    }
}
