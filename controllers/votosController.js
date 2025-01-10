const db = require('../database/conexion.js');
class VotosController {
    constructor (req, res) {

    }
    consultar(req, res) {
        try {
         db.query(`SELECT * FROM votos`, 
             (err, rows) => {  
                 if (err) {
                     res.status(400).send(err);  
                 } else {
                     res.status(201).json(rows);  
                 }
             });
         } catch (err) {
             res.status(500).send(err.message);  
         }
     }

     ingresar(req, res) {
        try {
            const { voter_id, candidate_id } = req.body;
    
            // Paso 1: Verificar si el votante es un candidato
            db.query('SELECT * FROM candidatos WHERE id = ?', 
                [voter_id], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al verificar el votante', error: err.message });
                }
    
                if (results.length > 0) {
                    return res.status(400).json({ message: 'El votante no puede ser candidato' });
                }
    
                // Paso 2: Verificar si el candidato es un votante
                db.query('SELECT * FROM votantes WHERE id = ?', 
                    [candidate_id], (err, results) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error al verificar el candidato', error: err.message });
                    }
    
                    if (results.length > 0) {
                        return res.status(400).json({ message: 'El candidato no puede ser votante' });
                    }
    
                    // Paso 3: Verificar si el votante ya ha votado
                    db.query('SELECT has_voted FROM votantes WHERE id = ?', 
                        [voter_id], (err, results) => {
                        if (err) {
                            return res.status(500).json({ message: 'Error al verificar si el votante ha votado', error: err.message });
                        }
    
                        if (results.length === 0 || results[0].has_voted) {
                            return res.status(400).json({ message: 'El votante ya ha emitido su voto' });
                        }
    
                        // Paso 4: Verificar si el candidato existe
                        db.query('SELECT * FROM candidatos WHERE id = ?', 
                            [candidate_id], (err, results) => {
                            if (err) {
                                return res.status(500).json({ message: 'Error al verificar el candidato', error: err.message });
                            }
    
                            if (results.length === 0) {
                                return res.status(400).json({ message: 'Candidato no válido' });
                            }
    
                            // Paso 5: Registrar el voto
                            db.query(
                                `INSERT INTO votos (voter_id, candidate_id) 
                                VALUES (?, ?)`,
                                [voter_id, candidate_id],
                                (err, rows) => {
                                    if (err) {
                                        return res.status(500).json({ message: 'Error al registrar el voto', error: err.message });
                                    }
    
                                    // Paso 6: Actualizar has_voted del votante
                                    db.query(
                                        `UPDATE votantes SET has_voted = true WHERE id = ?`,
                                        [voter_id],
                                        (err) => {
                                            if (err) {
                                                return res.status(500).json({ message: 'Error al actualizar el estado del votante', error: err.message });
                                            }
    
                                            // Paso 7: Incrementar el conteo de votos del candidato
                                            db.query(
                                                `UPDATE candidatos SET votes = votes + 1 WHERE id = ?`,
                                                [candidate_id],
                                                (err) => {
                                                    if (err) {
                                                        return res.status(500).json({ message: 'Error al actualizar el conteo de votos del candidato', error: err.message });
                                                    }
    
                                                    res.status(201).json({ message: 'Voto registrado exitosamente' });
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        });
                    });
                });
            });
        } catch (err) {
            res.status(500).json({ message: 'Error interno del servidor', error: err.message });
        }
    }
       

    borrar(req, res) {
        const { id } = req.params;
        try {
            db.query(`DELETE FROM votos WHERE id = ?;`,
            [id], (err, rows) => {
                if (err) {
                    res.status(400).send(err);  
                } if(rows.affectedRows == 1) {
                    res.status(201).json({ respuesta: 'Voto Eliminado exitosamente'});  
                }
            });
        } catch (err) {
            res.status(500).send(err.message);  
        }
        
    }

consultarEstadisticas(req, res) {
    try {
        // Obtener todos los candidatos
        db.query('SELECT id, full_name, party, votes FROM candidatos', 
            (err, candidates) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener los candidatos', error: err.message });
            }

            // Contar el total de votantes que han votado
            db.query('SELECT COUNT(*) AS total_votantes_que_votaron FROM votantes WHERE has_voted = true', 
                (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al obtener el número de votantes que han votado', error: err.message });
                }

                const votantes_que_votaron = result[0].total_votantes_que_votaron;

                // Contar el total de votantes
                db.query('SELECT COUNT(*) AS total_votantes FROM votantes', (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error al obtener el número total de votantes', error: err.message });
                    }

                    const totalVoters = result[0].total_votantes;

                    // Calcular las estadísticas de los candidatos
                    const statistics = candidates.map(candidate => {
                        const percentage = votantes_que_votaron > 0 ? ((candidate.votes / votantes_que_votaron) * 100).toFixed(2) : 0;
                        return {
                            candidato: candidate.full_name,
                            partido:candidate.party,
                            totalVotos: candidate.votes,
                            porcentaje: `${percentage}%`,
                        };
                    });

                    // Enviar la respuesta con las estadísticas
                    res.json({
                        statistics,
                        totalVotantesQueVotaron: votantes_que_votaron,
                        totalVotantes: totalVoters,
                    });
                });
            });
        });
        } catch (err) {
            res.status(500).json({ message: 'Error interno del servidor', error: err.message });
        }
    }
}
module.exports = new VotosController();