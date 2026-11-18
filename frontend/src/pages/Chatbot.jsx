
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Sparkles,
  Droplet,
  FlaskConical,
  Sun,
  MessageCircle,
  RefreshCw,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

import '../styles/chatbot.css';

const quickTopics = [
  { icon: '✨', label: 'Minyak Berlebih & Jerawat' },
  { icon: '💧', label: 'Kulit Berminyak tapi Dehidrasi' },
  { icon: '🧴', label: 'Pilihan Pelembap Bebas Minyak' },
  { icon: '♙', label: 'Kombinasi BHA & Niacinamide' },
  { icon: '☀️', label: 'Rekomendasi Tabir Surya Matte' }
];

const initialMessage = {
  id: 1,
  sender: 'bot',
  text: (
    <>
      Halo, selamat datang di ruang konsultasi <strong>Rijema Dira.</strong>
      <br /><br />
      Saya siap membantu Anda memahami kondisi kulit wajah,
      mengidentifikasi apakah kulit Anda tergolong berminyak atau
      mengalami dehidrasi, serta memberikan panduan kandungan
      skincare yang cocok. Silakan sampaikan keluhan Anda atau
      pilih topik yang tersedia.
    </>
  )
};

function getBotResponse(message) {
  const text = message.toLowerCase();

  if (
    text.includes('jerawat') ||
    text.includes('berminyak') ||
    text.includes('minyak')
  ) {
    return {
      title: 'Panduan untuk Kulit Berminyak dan Berjerawat',
      text: (
        <>
          Kombinasi area T-zone yang berminyak dan timbulnya jerawat
          biasanya dapat berkaitan dengan produksi sebum berlebih,
          pori tersumbat, atau iritasi kulit.
          <br /><br />
          <strong>Langkah Perawatan yang Tepat:</strong>
          <ol>
            <li>Gunakan pembersih gel dengan pH seimbang dua kali sehari.</li>
            <li>
              Pertimbangkan <em>Salicylic Acid (BHA 1-2%)</em> secara
              bertahap untuk membantu membersihkan pori.
            </li>
            <li>
              Gunakan <em>Niacinamide (2-5%)</em> untuk membantu
              mengontrol produksi sebum.
            </li>
            <li>
              Tetap gunakan pelembap ringan dan sunscreen pada pagi hari.
            </li>
          </ol>
          <strong>Catatan:</strong> Mulai bahan aktif secara bertahap
          dan hentikan jika terjadi iritasi.
        </>
      )
    };
  }

  if (
    text.includes('dehidrasi') ||
    text.includes('kering') ||
    text.includes('hidrasi')
  ) {
    return {
      title: 'Panduan Kulit Berminyak tetapi Dehidrasi',
      text: (
        <>
          Kulit berminyak tidak selalu berarti kulit memiliki
          kelembapan yang cukup. Kulit dapat menghasilkan minyak
          berlebih sekaligus mengalami kekurangan air.
          <br /><br />
          <strong>Rekomendasi Perawatan:</strong>
          <ol>
            <li>Gunakan pembersih wajah yang lembut.</li>
            <li>
              Pilih serum dengan <em>Hyaluronic Acid</em> atau
              Glycerin untuk membantu menjaga hidrasi.
            </li>
            <li>Gunakan pelembap gel yang ringan.</li>
            <li>Hindari mencuci wajah secara berlebihan.</li>
          </ol>
        </>
      )
    };
  }

  if (
    text.includes('pelembap') ||
    text.includes('moisturizer') ||
    text.includes('gel')
  ) {
    return {
      title: 'Memilih Pelembap untuk Kulit Berminyak',
      text: (
        <>
          Pelembap tetap diperlukan meskipun kulit Anda berminyak.
          Pilih produk dengan tekstur ringan agar nyaman digunakan.
          <br /><br />
          <strong>Kandungan yang bisa dipertimbangkan:</strong>
          <ol>
            <li>Hyaluronic Acid untuk membantu hidrasi.</li>
            <li>Niacinamide untuk membantu mengontrol sebum.</li>
            <li>Ceramide untuk mendukung skin barrier.</li>
            <li>Glycerin sebagai bahan humektan.</li>
          </ol>
          Carilah formula yang terasa nyaman dan tidak menyebabkan
          reaksi negatif pada kulit Anda.
        </>
      )
    };
  }

  if (
    text.includes('bha') ||
    text.includes('niacinamide') ||
    text.includes('kandungan')
  ) {
    return {
      title: 'Mengenal BHA dan Niacinamide',
      text: (
        <>
          BHA dan Niacinamide memiliki fungsi yang berbeda dan dapat
          menjadi bagian dari rutinitas perawatan kulit.
          <br /><br />
          <strong>BHA (Salicylic Acid):</strong>
          <p>
            Membantu mengeksfoliasi sel kulit mati dan membersihkan
            pori yang tersumbat.
          </p>
          <br />
          <strong>Niacinamide:</strong>
          <p>
            Membantu mendukung skin barrier dan mengatur produksi
            sebum.
          </p>
          <br />
          Gunakan bahan aktif secara bertahap dan perhatikan toleransi
          kulit masing-masing.
        </>
      )
    };
  }

  if (
    text.includes('sunscreen') ||
    text.includes('tabir surya') ||
    text.includes('matahari')
  ) {
    return {
      title: 'Rekomendasi Tabir Surya untuk Kulit Berminyak',
      text: (
        <>
          Untuk kulit berminyak, Anda dapat mempertimbangkan
          sunscreen bertekstur gel atau fluid dengan hasil akhir
          matte.
          <br /><br />
          <strong>Hal yang perlu diperhatikan:</strong>
          <ol>
            <li>Pilih perlindungan minimal SPF 30 dan broad spectrum.</li>
            <li>Pertimbangkan tekstur ringan yang nyaman.</li>
            <li>Gunakan sesuai petunjuk pemakaian produk.</li>
            <li>Aplikasikan ulang secara berkala, terutama saat terpapar matahari.</li>
          </ol>
        </>
      )
    };
  }

  if (
    text.includes('halo') ||
    text.includes('hai') ||
    text.includes('hello')
  ) {
    return {
      title: 'Halo! Senang bertemu dengan Anda.',
      text: (
        <>
          Saya Rijema Dira Assistant. Saya siap membantu konsultasi
          perawatan kulit Anda.
          <br /><br />
          Anda bisa menceritakan kondisi kulit, masalah jerawat,
          produksi minyak, atau bertanya mengenai kandungan skincare.
        </>
      )
    };
  }

  return {
    title: 'Mari kita kenali kondisi kulit Anda.',
    text: (
      <>
        Terima kasih sudah bertanya! Agar saya dapat memberikan
        panduan yang lebih sesuai, boleh ceritakan sedikit mengenai
        kondisi kulit Anda?
        <br /><br />
        Misalnya:
        <ol>
          <li>Apakah wajah mudah berminyak?</li>
          <li>Apakah sering muncul jerawat atau komedo?</li>
          <li>Apakah kulit terasa kering atau tertarik setelah mencuci wajah?</li>
        </ol>
        Anda juga bisa memilih salah satu topik konsultasi di sebelah kiri.
      </>
    )
  };
}

function Chatbot() {
  const [messages, setMessages] = useState([
    { ...initialMessage, time: 'Hari ini' }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const message = text.trim();

    if (!message || isTyping) return;

    const now = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: message,
        time: now
      }
    ]);

    setInput('');
    setIsTyping(true);

    const response = getBotResponse(message);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          title: response.title,
          text: response.text,
          time: new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      ]);

      setIsTyping(false);
    }, 700);
  };

  const newConversation = () => {
    setMessages([{ ...initialMessage, id: Date.now(), time: 'Hari ini' }]);
    setInput('');
    setIsTyping(false);
  };

  return (
    <div className="chatbot-page">

      {/* HEADER */}
      <header className="chatbot-header">
        <Link to="/dashboard" className="chatbot-brand">
          <span className="chatbot-brand-logo">RD</span>
          <span>Rijema <b>Dira</b></span>
        </Link>

        <Link to="/dashboard" className="back-home">
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Link>
      </header>

      <main className="chatbot-layout">

        {/* LEFT SIDEBAR */}
        <aside className="chatbot-sidebar">

          <div className="assistant-profile">
            <div className="assistant-avatar">RD</div>

            <h2>Asisten Konsultasi</h2>
            <p>Panduan Perawatan Kulit Personal</p>

            <span className="online-status">
              <span></span>
              Aktif 24 Jam
            </span>
          </div>

          <div className="quick-topics">
            <h3>Pilihan Topik Cepat</h3>

            {quickTopics.map((topic, index) => (
              <button
                key={index}
                className="topic-button"
                onClick={() => sendMessage(topic.label)}
                disabled={isTyping}
              >
                <span>{topic.icon}</span>
                {topic.label}
              </button>
            ))}
          </div>

        </aside>

        {/* CHAT AREA */}
        <section className="chat-window">

          {/* CHAT HEADER */}
          <div className="chat-window-header">
            <div className="chat-header-info">
              <div className="small-avatar">RD</div>

              <div>
                <h2>Rijema Dira Assistant</h2>
                <p><span></span> Sedang online & siap membantu</p>
              </div>
            </div>

            <button
              className="new-chat-button"
              onClick={newConversation}
            >
              <RefreshCw size={14} />
              Mulai Percakapan Baru
            </button>
          </div>

          {/* MESSAGES */}
          <div className="chat-messages">

            {messages.map(message => (
              <div
                className={`message-row ${message.sender}`}
                key={message.id}
              >
                {message.sender === 'bot' && (
                  <div className="message-avatar">RD</div>
                )}

                <div className="message-content">
                  <div className="message-bubble">
                    {message.title && (
                      <h3>{message.title}</h3>
                    )}

                    <div>{message.text}</div>
                  </div>

                  <span className="message-time">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-row bot">
                <div className="message-avatar">RD</div>
                <div className="message-bubble typing-indicator">
                  Rijema Dira sedang mengetik...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="chat-input-area">
            <form
              className="chat-input-form"
              onSubmit={e => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Tuliskan pertanyaan seputar kondisi kulit Anda..."
                disabled={isTyping}
              />

              <button
                type="submit"
                aria-label="Kirim pesan"
                disabled={!input.trim() || isTyping}
              >
                <Send size={19} />
              </button>
            </form>

            <p className="chat-tips">
              Tips: Anda dapat menanyakan rekomendasi pembersih wajah,
              pelembap gel, maupun bahan aktif seperti BHA dan Niacinamide.
            </p>
          </div>

        </section>
      </main>
    </div>
  );
}

export default Chatbot;
