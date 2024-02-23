import pool from "../config/db.js";

class Category {
  static async getAll() {
    const client = await pool.connect();
    try {
      const { rows } = await client.query("SELECT * FROM categories");
      return rows;
    } finally {
      client.release();
    }
  }

  static async getById(id) {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT * FROM categories WHERE id = $1",
        [id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  static async create(name, description) {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  static async update(id, name, description) {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
        [name, description, id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  static async delete(id) {
    const client = await pool.connect();
    try {
      await client.query("DELETE FROM categories WHERE id = $1", [id]);
    } finally {
      client.release();
    }
  }
}

export default Category;
