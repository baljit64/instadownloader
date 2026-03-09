import { ImageResponse } from 'next/og';
import { siteDescription, siteName } from './lib/site';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, #fff4f8 0%, #f4f5ff 52%, #eef7ff 100%)',
          color: '#13151f',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
          padding: '72px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-40px',
            width: '320px',
            height: '320px',
            borderRadius: '999px',
            background: 'rgba(255, 99, 145, 0.28)',
            filter: 'blur(32px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            right: '-60px',
            width: '360px',
            height: '360px',
            borderRadius: '999px',
            background: 'rgba(45, 124, 255, 0.22)',
            filter: 'blur(36px)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            borderRadius: '42px',
            border: '1px solid rgba(92, 104, 168, 0.12)',
            background: 'rgba(255, 255, 255, 0.75)',
            boxShadow: '0 24px 80px rgba(78, 87, 153, 0.14)',
            padding: '54px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                display: 'flex',
                width: '86px',
                height: '86px',
                borderRadius: '28px',
                background: 'linear-gradient(135deg, #ff8a5b, #ff4f9b 55%, #7c3aed)',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '34px',
                fontWeight: 800,
              }}
            >
              IG
            </div>
            <div
              style={{
                display: 'flex',
                width: '86px',
                height: '86px',
                borderRadius: '28px',
                background: 'linear-gradient(135deg, #101827, #2d7cff)',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '34px',
                fontWeight: 800,
              }}
            >
              DL
            </div>
            <div
              style={{
                marginLeft: '18px',
                fontSize: '34px',
                color: '#2d7cff',
                fontWeight: 700,
              }}
            >
              {siteName}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div
              style={{
                display: 'flex',
                fontSize: '86px',
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: '-0.05em',
              }}
            >
              Instagram Downloader
            </div>
            <div
              style={{
                display: 'flex',
                maxWidth: '920px',
                fontSize: '32px',
                lineHeight: 1.35,
                color: '#6e6a86',
              }}
            >
              {siteDescription}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '18px' }}>
            {['Reels', 'Photos', 'Carousel', 'Public links'].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  padding: '16px 26px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid rgba(145, 156, 230, 0.22)',
                  color: '#4b4570',
                  fontSize: '26px',
                  fontWeight: 600,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
