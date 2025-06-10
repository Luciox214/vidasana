package vidasana.tpo.pacientes.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import vidasana.tpo.auth.model.User;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "pacientes")
public class Paciente extends User {
    @NotNull(message = "El DNI no puede ser nulo")
    private String dni;
    private LocalDate fechaNacimiento;
    private HistoriaClinica historiaClinica;
}
