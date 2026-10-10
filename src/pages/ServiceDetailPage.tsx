import { useParams } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import { ServiceDetail } from '../components/services/ServiceDetail';
import { useSeo } from '../lib/seo';
import NotFoundPage from './NotFoundPage';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  if (!service) return <NotFoundPage />;
  return <ServiceDetailContent key={service.slug} slug={service.slug} />;
}

function ServiceDetailContent({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug)!;
  useSeo(`/services/${service.slug}`);
  return <ServiceDetail service={service} />;
}
