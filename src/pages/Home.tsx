import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  type RefresherEventDetail,
} from '@ionic/react';
import { useEffect, useState } from 'react';

import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import type { Product } from '../types/Product';
import './Home.css';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carga los productos de Supabase
  const loadProducts = async () => {
    try {
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta una vez al entrar en la página
  useEffect(() => {
    loadProducts();
  }, []);

  // Deslizar hacia abajo para recargar
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await loadProducts();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Catálogo de productos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <main className="container py-4">
          <header className="mb-4">
            <h1 className="h3 fw-bold mb-1">Nuestros productos</h1>
            <p className="text-body-secondary mb-0">Datos cargados en directo desde Supabase</p>
          </header>

          {/* Estado: cargando */}
          {loading && (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          {/* Estado: error */}
          {!loading && error && (
            <div className="alert alert-danger" role="alert">
              <strong>No se pudieron cargar los productos:</strong> {error}
            </div>
          )}

          {/* Estado: sin datos */}
          {!loading && !error && products.length === 0 && (
            <div className="alert alert-info" role="alert">
              Todavía no hay productos en la base de datos.
            </div>
          )}

          {/* Rejilla de tarjetas: 1 columna en móvil, 2 en tablet, 3 en escritorio */}
          {!loading && !error && products.length > 0 && (
            <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {products.map((product) => (
                <div className="col" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </section>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Home;
