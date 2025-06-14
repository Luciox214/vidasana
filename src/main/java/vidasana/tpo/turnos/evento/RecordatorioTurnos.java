package vidasana.tpo.turnos.evento;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vidasana.tpo.turnos.email.service.EmailService;
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

    @Transactional
    public void enviarRecordatorios() {
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime en24hs = ahora.plusHours(24);

        System.out.println("⏱️ Buscando turnos entre: " + ahora + " y " + en24hs);

        List<Turno> turnosProximos = turnoRepo.findByFechaBetweenAndRecordatorioEnviadoFalse(ahora, en24hs);

        System.out.println("🔍 Turnos encontrados: " + turnosProximos.size());

        for (Turno turno : turnosProximos) {
            System.out.println("📅 Turno para paciente " + turno.getPacienteId() + " - Fecha: " + turno.getFecha());

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
                turno.setRecordatorioEnviado(true);
                turnoRepo.save(turno);
            });
        }
    }
}
