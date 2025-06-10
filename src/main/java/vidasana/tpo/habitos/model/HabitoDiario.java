package vidasana.tpo.habitos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "habitos_diarios")
public class HabitoDiario {
    @Id
    private String id;
    private String pacienteId;
    private LocalDate fecha;
    private int sueno; //Horas dormidas
    private String alimentacion; //Por ej: "3 comidas", "2 comidas"
    private List<String> sintomas;
}
