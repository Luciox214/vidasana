package vidasana.tpo.usuarios.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vidasana.tpo.usuarios.model.Usuario;
import vidasana.tpo.usuarios.service.UsuarioService;

@RestController
@RequestMapping("/api/v1")

public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping(value = "/usuarios")
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        if (usuario == null) {
            return ResponseEntity.badRequest().build();
        }
        usuarioService.crearUsuario(usuario);
        return ResponseEntity.ok(usuario);
    }


}
