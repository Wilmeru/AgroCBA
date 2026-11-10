import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function App() {

  const [nombre, setNombre] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [valor, setValor] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [pedidosValidos, setPedidosValidos] = useState(0);

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [datosGuardados, setDatosGuardados] = useState({ nombre: '', producto: '', cantidad: '', valor: '' });

  // LIMPIAR FORMULARIO
  const limpiarFormulario = () => {
    setNombre('');
    setProducto('');
    setCantidad('');
    setValor('');
    setMensaje('Limpiado correctamente');
    setMostrarTarjeta(false);
  };

  // MOSTRAR INFORMACION
  // MOSTRAR INFORMACION
  const mostrarInformacion = () => {
    if (nombre.trim() === '') {
      setMensaje('Debe ingresar el nombre del cliente');
      setMostrarTarjeta(false);
    } else if (producto.trim() === '') {
      setMensaje('Debe ingresar el producto comprado');
      setMostrarTarjeta(false);
    } else if (cantidad.trim() === '') {
      setMensaje('Debe ingresar la cantidad');
      setMostrarTarjeta(false);
    } else if (parseInt(cantidad, 10) <= 0) {
      setMensaje('La cantidad debe ser mayor que cero');
      setMostrarTarjeta(false);
    } else if (valor.trim() === '') {
      setMensaje('Debe ingresar el valor unitario');
      setMostrarTarjeta(false);
    } else if (parseFloat(valor) <= 0) {
      setMensaje('El valor unitario debe ser mayor que cero');
      setMostrarTarjeta(false);
    } else {
      setDatosGuardados({
        nombre: nombre,
        producto: producto,
        cantidad: cantidad,
        valor: valor
      });

      setMostrarTarjeta(true);
      setMensaje('¡Producto guardado correctamente!');
      setPedidosValidos(pedidosValidos + 1);
    }
  };

  const calcularTotal = () => {
    const cant = parseFloat(datosGuardados.cantidad) || 0;
    const val = parseFloat(datosGuardados.valor) || 0;
    return cant * val;
  };

  return (
    <View style={styles.appContainer}>
      
      {/* TÍTULO PRINCIPAL DESTACADO */}
      <View style={styles.headerContainer}>
        <View style={styles.topBar} />
        <Text style={styles.headerTitle}>🌾 Bienvenidos a AgroCBA 🌿</Text>
        <Text style={styles.headerSubtitle}>Sistema de Gestión y Registro de Pedidos</Text>
      </View>

      {/* CONTENEDOR PRINCIPAL (LADO IZQUIERDO Y DERECHO) */}
      <View style={styles.container}>

        {/* LADO IZQUIERDO */}
        <View style={styles.izquierda}>
          <Text style={styles.titulo}>Registro de Pedidos</Text>
          
          <View style={styles.contador}>
            <Text style={styles.textoContador}> Pedidos válidos: {pedidosValidos} </Text>
          </View>

          {mostrarTarjeta ? (
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Nombre:</Text>
              <Text>{datosGuardados.nombre}</Text>

              <Text style={styles.cardLabel}>Producto:</Text>
              <Text>{datosGuardados.producto}</Text>

              <Text style={styles.cardLabel}>Cantidad:</Text>
              <Text>{datosGuardados.cantidad}</Text>

              <Text style={styles.cardLabel}>Precio Unitario:</Text>
              <Text>$ {datosGuardados.valor}</Text>

              <Text style={styles.cardLabel}>Valor Total:</Text>
              <Text style={styles.cardTotal}>$ {calcularTotal()}</Text>
            </View>
          ) : (
            <Text>No hay productos guardados</Text>
          )}
        </View>

        {/* LADO DERECHO */}
        <View style={styles.derecha}>
          <Text style={styles.titulo}>Formulario</Text>

          <Text style={styles.labelForm}>Nombre: </Text>
          <TextInput style={styles.input} placeholder="Escribe tu nombre" value={nombre} onChangeText={setNombre}/>

          <Text style={styles.labelForm}>Producto: </Text>
          <TextInput style={styles.input} placeholder="Escribe el producto comprado" value={producto} onChangeText={setProducto}/>

          <Text style={styles.labelForm}>Cantidad: </Text>
          <TextInput style={styles.input} placeholder="Cantidad de productos" keyboardType="number-pad" value={cantidad} onChangeText={(texto) => { setCantidad(texto.replace(/[^0-9]/g, ''));}}/>

          <Text style={styles.labelForm}>Valor Unitario ($): </Text>
          <TextInput style={styles.input} placeholder="Precio Unitario del Producto" keyboardType="number-pad" value={valor} onChangeText={(texto) => { setValor(texto.replace(/[^0-9]/g, ''));}}/>

          <Pressable style={styles.boton} onPress={mostrarInformacion}>
            <Text style={styles.textoBoton}>Registrar Pedido</Text>
          </Pressable>

          <Pressable style={styles.boton1} onPress={limpiarFormulario}>
            <Text style={styles.textoBoton}> Limpiar formulario </Text>
          </Pressable>

          {/* MENSAJE */}
          <View style={styles.resultado}>
            <Text style={styles.mensaje}>
              {mensaje}
            </Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F4F7F6',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 3,
    borderBottomColor: '#2dc234',
    shadowColor: '#167A43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  topBar: {
    width: 60,
    height: 5,
    backgroundColor: '#2dc234',
    borderRadius: 3,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0F522C',
    letterSpacing: 1.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#475569',
    marginTop: 6,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    gap: 20,
  },
  izquierda: {
    flex: 1,
    backgroundColor: '#E8F1FC',
    padding: 15,
    borderRadius: 10,
  },
  derecha: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    padding: 15,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  labelForm: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#334155',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    gap: 6,
  },
  cardLabel: {
    fontWeight: 'bold',
    color: '#555',
    marginTop: 4,
  },
  cardTotal: {
    fontWeight: 'bold',
    color: '#167A43',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#2dc234',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  boton1: {
    backgroundColor: '#c72f2f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 15,
    padding: 10,
  },
  mensaje: {
    fontWeight: 'bold',
    color: '#2465A5',
  },
  contador: {
    backgroundColor: '#D1F5DF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  textoContador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#167A43',
  },
});