package vidasana.tpo.red.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RelacionAtiende {

    @Id
    @GeneratedValue
    private Long id; // Requerido por Neo4j para actualizar propiedades

    @TargetNode
    private MedicoNode medico;

    @Property
    private int cantidadTurnos;
}
