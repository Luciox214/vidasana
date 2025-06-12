package vidasana.tpo.turnos.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vidasana.tpo.turnos.email.service.EmailService;
import vidasana.tpo.medicos.model.Medico;
import vidasana.tpo.medicos.repository.MedicoRepository;
import vidasana.tpo.pacientes.model.Paciente;
import vidasana.tpo.pacientes.repository.PacienteRepository;
import vidasana.tpo.red.repositories.RedRepository;
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
    public Turno crearTurnoYActualizarRed(Turno turno) {
        Turno guardado = turnoRepo.save(turno);
        redRepository.registrarTurno(turno.getPacienteId(), turno.getMedicoId());


        Paciente paciente = pacienteRepo.findById(turno.getPacienteId()).orElseThrow();
        Medico medico = medicoRepo.findById(turno.getMedicoId()).orElseThrow();

        emailService.enviar(paciente.getEmail(), "Confirmación de turno", "Tu turno fue agendado para " + turno.getFecha());
        emailService.enviar(medico.getEmail(), "Nuevo turno asignado", "Tenés un nuevo turno con el paciente " + paciente.getNombre() + " el " + turno.getFecha());

        return guardado;
    }

    public List<Turno> obtenerPorPaciente(String pacienteId) {
        return turnoRepo.findByPacienteId(pacienteId);
    }

    public List<Turno> obtenerPorMedico(String medicoId) {
        return turnoRepo.findByMedicoId(medicoId);
    }
}
