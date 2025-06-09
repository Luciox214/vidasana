package vidasana.tpo.pacientes.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "pacientes")
public class Paciente {
    @Id
    private String id;
    private String dni;
    private LocalDate fechaNacimiento;
    private HistoriaClinica historiaClinica; // Podemos Nullear esto al principio para crear el paciente.
}
