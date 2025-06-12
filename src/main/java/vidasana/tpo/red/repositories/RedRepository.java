package vidasana.tpo.red.repositories;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import vidasana.tpo.red.model.PacienteNode;

import java.util.Set;

public interface RedRepository extends Neo4jRepository<PacienteNode, String> {

    @Query("""
        MERGE (p:Paciente {id: $pacienteId})
        MERGE (m:Medico {id: $medicoId})
        MERGE (p)-[r:ATIENDE]->(m)
        ON CREATE SET r.cantidadTurnos = 1
        ON MATCH SET r.cantidadTurnos = r.cantidadTurnos + 1
    """)
    void registrarTurno(String pacienteId, String medicoId);

    @Query("""
    MATCH (p:Paciente)-[r:ATIENDE]->(m:Medico {id: $medicoId})
    RETURN p
    """)
    Set<PacienteNode> listarPacientesDeMedico(String medicoId);
}
