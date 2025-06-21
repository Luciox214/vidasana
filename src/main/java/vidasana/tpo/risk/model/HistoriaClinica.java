package vidasana.tpo.risk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoriaClinica {
    private List<String> antecedentes;
    private List<String> alergias;
    private List<String> enfermedadesCronicas;

    // Para el scoring
    private List<String> antecedentesFamiliares; // "diabetes", "hipertension", etc.
    private Double imc; // Índice de masa corporal
    private String grupoSanguineo;
}
