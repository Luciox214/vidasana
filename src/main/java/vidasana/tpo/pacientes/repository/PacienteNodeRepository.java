package vidasana.tpo.pacientes.repository;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import vidasana.tpo.pacientes.model.PacienteNode;

public interface PacienteNodeRepository extends Neo4jRepository<PacienteNode, String> {
}