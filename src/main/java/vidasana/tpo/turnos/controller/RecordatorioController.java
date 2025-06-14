package vidasana.tpo.turnos.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.turnos.evento.RecordatorioTurnos;

@RestController
@RequestMapping("/api/v1/recordatorios")
public class RecordatorioController {

    @Autowired
    private RecordatorioTurnos recordatorioTurnos;

    @GetMapping()
    public String ejecutarRecordatorios() {
        recordatorioTurnos.enviarRecordatorios();
        return "✔️ Recordatorios enviados";
    }
}
