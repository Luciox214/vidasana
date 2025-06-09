package vidasana.tpo.usuarios.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vidasana.tpo.usuarios.model.Usuario;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, Integer> {
}