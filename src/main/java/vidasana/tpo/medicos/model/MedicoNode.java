package vidasana.tpo.medicos.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;
import vidasana.tpo.pacientes.model.PacienteNode;

import java.util.Set;


@Node("Medico")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicoNode {
    @Id
    @Property("id")
    private String id;

    private String nombre;

    @Relationship(type = "ATIENDE", direction = Relationship.Direction.OUTGOING)
    private Set<PacienteNode> pacientes;
}