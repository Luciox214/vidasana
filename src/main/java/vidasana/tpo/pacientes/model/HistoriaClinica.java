package vidasana.tpo.pacientes.model;

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
}
