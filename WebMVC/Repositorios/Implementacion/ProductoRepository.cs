using Microsoft.Extensions.Configuration;
using WebMVC.Models;
using WebMVC.Repositorios.Contrato;

using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using Microsoft.Data.SqlClient;
using System.Text.RegularExpressions;


namespace WebMVC.Repositorios.Implementacion
{
    public class ProductoRepository : IGenericRepository<Producto>
    {
        private readonly string _cadenaSQL = "";
        public ProductoRepository(IConfiguration configuracion) {
            _cadenaSQL = configuracion.GetConnectionString("cadenaSQL");
        }

        public async Task<List<Producto>> Lista()
        {
           List<Producto> _lista=  new List<Producto>();
            using(var conexion= new SqlConnection(_cadenaSQL))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_ListaProducto",conexion);
                using (var dr= await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        _lista.Add(new Producto
                        {
                            id = Convert.ToInt32(dr["id"]),
                            codigo=dr["codigo"].ToString(),
                            marca = dr["marca"].ToString(),
                            modelo = dr["modelo"].ToString()
                        });
                    }
                }
                    
            }
            return _lista;
        }

        public async Task<bool> Editar(Producto modelo)
        {
            using(var conexion= new SqlConnection(_cadenaSQL)) { 
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_UpdateProducto", conexion);
                cmd.Parameters.AddWithValue("id",modelo.id);
                cmd.Parameters.AddWithValue("codigo", modelo.codigo);
                cmd.Parameters.AddWithValue("marca", modelo.marca);
                cmd.Parameters.AddWithValue("modelo", modelo.modelo);
                cmd.CommandType = CommandType.StoredProcedure;
                int filas_afectadas = await cmd.ExecuteNonQueryAsync();
                return (filas_afectadas>0) ? true : false;
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            using (var conexion = new SqlConnection(_cadenaSQL)){
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_DeleteProducto", conexion);
                cmd.Parameters.AddWithValue("id",id);
                cmd.CommandType = CommandType.StoredProcedure;
                int filas_afectadas = await cmd.ExecuteNonQueryAsync();
                return (filas_afectadas > 0) ? true : false;
            }
        }

        public async Task<bool> Guardar(Producto modelo)
        {
            using (var conexion = new SqlConnection(_cadenaSQL))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_InsertarProducto", conexion);
                cmd.Parameters.AddWithValue("codigo", modelo.codigo);
                cmd.Parameters.AddWithValue("marca", modelo.marca);
                cmd.Parameters.AddWithValue("modelo", modelo.modelo);
                cmd.CommandType = CommandType.StoredProcedure;
                int filas_afectadas = await cmd.ExecuteNonQueryAsync();
                return (filas_afectadas > 0) ? true : false;
            }
        }

        
    }
}
