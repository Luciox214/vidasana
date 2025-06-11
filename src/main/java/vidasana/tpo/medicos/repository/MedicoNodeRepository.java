package vidasana.tpo.medicos.repository;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import vidasana.tpo.medicos.model.MedicoNode;

public interface MedicoNodeRepository extends Neo4jRepository<MedicoNode, String> {
}