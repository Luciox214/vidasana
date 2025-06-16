package vidasana.tpo.turnos.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vidasana.tpo.medicos.model.Medico;
import vidasana.tpo.medicos.repository.MedicoRepository;
import vidasana.tpo.pacientes.model.Paciente;
import vidasana.tpo.pacientes.repository.PacienteRepository;
import vidasana.tpo.red.repositories.RedRepository;
import vidasana.tpo.turnos.email.service.EmailService;
import vidasana.tpo.turnos.model.Turno;
import vidasana.tpo.turnos.repository.TurnoRepository;

import java.util.List;

@Service
public class TurnoService {

    @Autowired
    private TurnoRepository turnoRepo;

    @Autowired
    private RedRepository redRepository;


    @Autowired
    private PacienteRepository pacienteRepo;

    @Autowired
    private MedicoRepository medicoRepo;
    @Autowired
    private EmailService emailService;
    @Transactional
    public Turno confirmarTurno(String turnoId, String medicoId, boolean confirmar) {
        Turno turno = turnoRepo.findById(turnoId).orElseThrow();
        if (!turno.getMedicoId().equals(medicoId)) {
            throw new SecurityException("No autorizado para confirmar este turno");
        }

        if (confirmar) {
            turno.setEstado("CONFIRMADO");
            Paciente paciente = pacienteRepo.findById(turno.getPacienteId()).orElseThrow();
            emailService.enviar(paciente.getEmail(), "Confirmación de turno", "Tu turno fue confirmado para " + turno.getFecha());
            Medico medico = medicoRepo.findById(turno.getMedicoId()).orElseThrow();
            emailService.enviar(medico.getEmail(), "Nuevo turno confirmado",
                    "Se ha confirmado un turno con el paciente " + paciente.getNombre() + " para la fecha " + turno.getFecha());
            redRepository.registrarTurno(
                    turno.getPacienteId(),
                    paciente.getNombre(),
                    turno.getMedicoId(),
                    medico.getNombre()
            );
        } else {
            turno.setEstado("RECHAZADO");
            Paciente paciente = pacienteRepo.findById(turno.getPacienteId()).orElseThrow();
            emailService.enviar(paciente.getEmail(), "Rechazo de turno", "Tu turno fue rechazado por el médico.");
        }

        return turnoRepo.save(turno);
    }
    @Transactional
    public Turno guardarTurnoPendiente(Turno turno) {
        return turnoRepo.save(turno); // Solo guarda el turno con estado "PENDIENTE"
    }

    public List<Turno> obtenerPorPaciente(String pacienteId) {
        return turnoRepo.findByPacienteId(pacienteId);
    }

    public List<Turno> obtenerPorMedico(String medicoId) {
        return turnoRepo.findByMedicoId(medicoId);
    }
}
