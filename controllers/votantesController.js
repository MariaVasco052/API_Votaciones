const db = require('../database/conexion.js');
class VotantesController {
    constructor (req, res) {}

    consultar(req, res) {
        const { page = 1, limit = 10, search = '' } = req.query;
        const offset = (page - 1) * limit;

        try {
            db.query(
                `SELECT * FROM votantes WHERE has_voted LIKE ? LIMIT ? OFFSET ?`,
                [`%${search}%`, parseInt(limit), parseInt(offset)],
                (err, rows) => {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.status(200).json(rows);
                    }
                }
            );
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    consultarDetalle(req, res) {
        const { id } = req.params;
        try {
            db.query(`SELECT * FROM votantes WHERE id = ?`, [id], (err, rows) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.status(200).json(rows);
                }
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    ingresar(req, res) {
        try {
            const { full_name, email, has_voted } = req.body;

            db.query(
                `INSERT INTO votantes (full_name, email, has_voted) VALUES( ?, ?, ?);`,
                [full_name, email, has_voted],
                (err, rows) => {
                    if (err) {
                        res.status(400).send(err);
                    }
                    if (rows.insertId) res.status(201).json({ id: rows.insertId });
                }
            );
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    borrar(req, res) {
        const { id } = req.params;
        try {
            db.query(`DELETE FROM votantes WHERE id = ?;`, [id], (err, rows) => {
                if (err) {
                    res.status(400).send(err);
                }
                if (rows.affectedRows == 1) {
                    res.status(200).json({ respuesta: 'Votante Eliminado exitosamente' });
                }
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}
module.exports = new VotantesController();