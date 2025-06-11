package vidasana.tpo.pacientes.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;

@Node("Paciente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacienteNode {
    @Id
    @Property("id")
    private String id;
    private String nombre;
}