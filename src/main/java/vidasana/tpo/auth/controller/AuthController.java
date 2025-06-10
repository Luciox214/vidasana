package vidasana.tpo.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.auth.service.JwtService;
import vidasana.tpo.auth.service.SessionService;
import vidasana.tpo.exceptions.BadRequestException;
import vidasana.tpo.medicos.model.Medico;
import vidasana.tpo.medicos.repository.MedicoRepository;
import vidasana.tpo.pacientes.model.Paciente;
import vidasana.tpo.pacientes.repository.PacienteRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private PacienteRepository pacienteRepository;
    @Autowired
    private MedicoRepository medicoRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        Optional<Medico> medicoOpt = medicoRepository.findByEmail(email);
        if (medicoOpt.isPresent()) {
            Medico medico = medicoOpt.get();
            if (!passwordEncoder.matches(password, medico.getPassword())) {
                throw new BadRequestException("Contraseña incorrecta");
            }
            String token = jwtService.generateToken(medico.getId(), medico.getRol().name());
            sessionService.saveSession(token, medico.getId(), medico.getRol().name(), medico.getEmail());
            return ResponseEntity.ok().body(token);
        }
        Optional<Paciente> pacienteOpt = pacienteRepository.findByEmail(email);
        if (pacienteOpt.isPresent()) {
            Paciente paciente = pacienteOpt.get();
            if (!passwordEncoder.matches(password, paciente.getPassword())) {
                throw new BadRequestException("Contraseña incorrecta");
            }
            String token = jwtService.generateToken(paciente.getId(), paciente.getRol().name());
            sessionService.saveSession(token, paciente.getId(), paciente.getRol().name(), paciente.getEmail());
            return ResponseEntity.ok().body(token);
        }
        throw new BadRequestException("Usuario no encontrado");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        sessionService.deleteSession(token.replace("Bearer ", ""));
        return ResponseEntity.ok().body("Sesión cerrada");
    }

    @PostMapping("/register/paciente")
    public ResponseEntity<?> registerPaciente(@RequestBody Paciente request) {
        if (pacienteRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email ya registrado.");
        }
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        request.setRol(vidasana.tpo.enums.Rol.PACIENTE); 
        Paciente pacienteGuardado = pacienteRepository.save(request);
        String token = jwtService.generateToken(pacienteGuardado.getId(), pacienteGuardado.getRol().name());
        sessionService.saveSession(token, pacienteGuardado.getId(), pacienteGuardado.getRol().name(), pacienteGuardado.getEmail());
        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/register/medico")
    public ResponseEntity<?> registerMedico(@RequestBody Medico request) {
        if (medicoRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email ya registrado.");
        }
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        Medico medicoGuardado = medicoRepository.save(request);
        String token = jwtService.generateToken(medicoGuardado.getId(), medicoGuardado.getRol().name());
        sessionService.saveSession(token, medicoGuardado.getId(), medicoGuardado.getRol().name(), medicoGuardado.getEmail());
        return ResponseEntity.ok().body(token);
    }
}
