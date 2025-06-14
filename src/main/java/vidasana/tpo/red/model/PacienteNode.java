package vidasana.tpo.red.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.*;
import java.util.Set;

@Node("Paciente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacienteNode {

    @Id
    @Property("id")
    private String id;

    private String nombre;

    @Relationship(type = "ATIENDE", direction = Relationship.Direction.OUTGOING)
    private Set<RelacionAtiende> medicos;


}
