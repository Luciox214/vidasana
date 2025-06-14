package vidasana.tpo.red.repositories;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import vidasana.tpo.red.model.PacienteNode;

public interface PacienteNodeRepository extends Neo4jRepository<PacienteNode, String> {
}