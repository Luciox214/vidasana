package vidasana.tpo.auth.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import vidasana.tpo.enums.Rol;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class User {
    @Id
    private String id;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private Rol rol;
}
