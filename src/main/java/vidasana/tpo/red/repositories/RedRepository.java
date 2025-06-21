package vidasana.tpo.red.repositories;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import vidasana.tpo.red.model.MedicoNode;
import vidasana.tpo.red.model.PacienteNode;

import java.util.Set;

public interface RedRepository extends Neo4jRepository<PacienteNode, String> {
    @Query("MATCH (m:MedicoNode)-[r:ATIENDE]->(p:PacienteNode) WHERE p.id = $pacienteId RETURN m.id AS id, m.nombre AS nombre")
    Set<MedicoNode> listarMedicosDePaciente(String pacienteId);

    @Query("""
    MERGE (p:PacienteNode {id: $pacienteId})
    ON CREATE SET p.nombre = $pacienteNombre
    MERGE (m:MedicoNode {id: $medicoId})
    ON CREATE SET m.nombre = $medicoNombre
    MERGE (m)-[r:ATIENDE]->(p)
    ON CREATE SET r.cantidadTurnos = 1
    ON MATCH SET r.cantidadTurnos = r.cantidadTurnos + 1
    """)
    void registrarTurno(String pacienteId, String pacienteNombre, String medicoId, String medicoNombre);

    @Query("""
    MATCH (m:MedicoNode {id: $medicoId})-[:ATIENDE]->(p:PacienteNode)
    OPTIONAL MATCH (p)<-[r:ATIENDE]-(otros:MedicoNode)
    RETURN DISTINCT p, collect(r), collect(otros)
    """)
    Set<PacienteNode> listarPacientesDeMedico(String medicoId);

}