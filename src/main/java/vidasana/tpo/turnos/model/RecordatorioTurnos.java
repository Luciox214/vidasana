package vidasana.tpo.turnos.model;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import vidasana.tpo.email.service.EmailService;
import vidasana.tpo.pacientes.model.Paciente;
import vidasana.tpo.pacientes.repository.PacienteRepository;
import vidasana.tpo.turnos.model.Turno;
import vidasana.tpo.turnos.repository.TurnoRepository;


import java.time.LocalDateTime;
import java.util.List;

@Component
public class RecordatorioTurnos {

    @Autowired
    private TurnoRepository turnoRepo;

    @Autowired
    private PacienteRepository pacienteRepo;

    @Autowired
    private EmailService emailService;

    // Se ejecuta cada hora (ajustable)
    @Scheduled(cron = "0 0 * * * *") // cada hora, en el minuto 0
    @Transactional
    public void enviarRecordatorios() {
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime en24hs = ahora.plusHours(24);

        List<Turno> turnosProximos = turnoRepo.findByFechaBetween(ahora, en24hs);

        for (Turno turno : turnosProximos) {
            pacienteRepo.findById(turno.getPacienteId()).ifPresent(paciente -> {
                String mensaje = String.format("""
                        Hola %s, te recordamos que tenés un turno médico programado para:
                        
                        📅 Fecha: %s
                        🕒 Hora: %s

                        Recordá asistir unos minutos antes. ¡Gracias por confiar en Vida Sana!
                        """,
                        paciente.getNombre(),
                        turno.getFecha().toLocalDate(),
                        turno.getFecha().toLocalTime()
                );
                emailService.enviar(
                        paciente.getEmail(),
                        "📢 Recordatorio de turno médico",
                        mensaje
                );
            });
        }
    }
}
