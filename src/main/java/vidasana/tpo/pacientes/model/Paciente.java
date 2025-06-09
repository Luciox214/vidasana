package vidasana.tpo.pacientes.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import vidasana.tpo.enums.Rol;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "pacientes")
public class Paciente {
    @Id
    private String id;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    @NotNull(message = "El DNI no puede ser nulo")
    private String dni;
    private LocalDate fechaNacimiento;
    private HistoriaClinica historiaClinica;
    private Rol rol;
}
