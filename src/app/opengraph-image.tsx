import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Joysriram Sarkar — AI-assisted Builder & Bengali Technologist';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F7F5F0',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#A33A2B',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#A33A2B',
              textTransform: 'uppercase',
            }}
          >
            joysriram.com
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#171717',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Joysriram Sarkar
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#6B6B67',
              lineHeight: 1.4,
            }}
          >
            AI-assisted Builder · Bengali-first Technologist
          </div>
          <div
            style={{
              fontSize: '20px',
              color: '#A33A2B',
              fontWeight: 500,
              marginTop: '8px',
            }}
          >
            শিলিগুড়ি, পশ্চিমবঙ্গ
          </div>
        </div>

        {/* Bottom tags */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['Bangla Typing', 'BanglaGan', 'Nilang', 'Open Source', 'Bengali Computing'].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#9E9E99',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Right accent line */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '6px',
            backgroundColor: '#A33A2B',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
