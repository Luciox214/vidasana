package vidasana.tpo.red.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.*;
import java.util.Set;

@Node("PacienteNode")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacienteNode {

    @Id
    @Property("id")
    private String id;
    @Property("nombre")
    private String nombre;

    @Relationship(type = "ATIENDE", direction = Relationship.Direction.INCOMING)
    private Set<RelacionAtiende> medicos;


}
