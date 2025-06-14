package vidasana.tpo.turnos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "turnos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Turno {
    @Id
    private String id;
    private String pacienteId;
    private String medicoId;
    private LocalDateTime fecha;
    private String estado; // Ej: "PENDIENTE", "CONFIRMADO"
}
