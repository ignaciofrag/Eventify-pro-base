export const timeSince = (date) => {
  const now = new Date();
  const parsedDate = new Date(date);
  const seconds = Math.floor((now - parsedDate) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} año${interval > 1 ? 's' : ''} atrás`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} mes${interval > 1 ? 'es' : ''} atrás`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} día${interval > 1 ? 's' : ''} atrás`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hora${interval > 1 ? 's' : ''} atrás`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minuto${interval > 1 ? 's' : ''} atrás`;
  }

  return `Menos de un minuto atrás`;
};

export const daysUntil = (date) => {
  const today = new Date();
  const eventDate = new Date(date);
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  const timeDiff = eventDate - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff < 0) {
    return "Evento finalizado";
  }
  return `${daysDiff} días faltantes`;
};
