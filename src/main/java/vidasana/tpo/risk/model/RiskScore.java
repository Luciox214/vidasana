package vidasana.tpo.risk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "risk_scores")
public class RiskScore {
    @Id
    private String id;
    private String pacienteId;
    private LocalDateTime fechaCalculo;

    // Scores simples (0-100)
    private int riesgoCardiovascular;
    private int riesgoDiabetes;
    private int riesgoObesidad;

    // Recomendaciones simples
    private List<String> recomendaciones;
    private String nivelRiesgo; // "BAJO", "MEDIO", "ALTO"
}