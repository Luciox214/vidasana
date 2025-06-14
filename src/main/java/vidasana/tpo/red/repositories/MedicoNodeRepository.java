package vidasana.tpo.red.repositories;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import vidasana.tpo.red.model.MedicoNode;

public interface MedicoNodeRepository extends Neo4jRepository<MedicoNode, String> {
}