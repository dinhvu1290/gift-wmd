import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import * as confetti from 'canvas-confetti';

export interface Gift {
  type: string;
  message: string;
  create: (container: HTMLElement) => void;
}

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  private gifts: Gift[] = [
    {
      type: 'flower',
      message: '🌹 Chúc bạn luôn xinh đẹp, rạng ngời và hạnh phúc!',
      create: (container: HTMLElement) => this.createFlowerAnimation(container)
    },
    {
      type: 'heart',
      message: '💖 Chúc bạn luôn vui tươi, tràn đầy năng lượng và thành công trong cuộc sống!',
      create: (container: HTMLElement) => this.createHeartAnimation(container)
    },
    {
      type: 'fireworks',
      message: '🎆 Chúc mừng ngày Quốc tế Phụ nữ 8/3! Chúc bạn luôn mạnh mẽ và tự tin!',
      create: () => this.createFireworksAnimation()
    },
    {
      type: 'message',
      message: '✨ Cảm ơn vì đã là người phụ nữ tuyệt vời! Chúc bạn một ngày 8/3 thật ý nghĩa! ✨',
      create: (container: HTMLElement) => this.createMessageAnimation(container)
    }
  ];

  getRandomGift(): Gift {
    return this.gifts[Math.floor(Math.random() * this.gifts.length)];
  }

  createFlowerAnimation(container: HTMLElement) {
    const garden = document.createElement('div');
    garden.className = 'flower-garden';
    
    const flowerCount = 5;
    const flowerColors = ['pink', 'purple', 'red', 'yellow', 'blue'];
    const positions = [
      { x: '50%', y: '50%' },
      { x: '20%', y: '30%' },
      { x: '80%', y: '40%' },
      { x: '30%', y: '70%' },
      { x: '70%', y: '60%' }
    ];

    for (let i = 0; i < flowerCount; i++) {
      const flowerContainer = document.createElement('div');
      flowerContainer.className = 'flower-container';
      
      const flower = document.createElement('div');
      flower.className = `flower flower-${flowerColors[i]}`;
      
      // Create flower center
      const center = document.createElement('div');
      center.className = 'flower-center';
      flower.appendChild(center);
      
      // Create petals
      const petalCount = 8;
      for (let j = 0; j < petalCount; j++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.setProperty('--rotate-angle', `${(360 / petalCount) * j}deg`);
        flower.appendChild(petal);
      }
      
      // Create stem and leaves
      const stem = document.createElement('div');
      stem.className = 'stem';
      
      const leafLeft = document.createElement('div');
      leafLeft.className = 'leaf leaf-left';
      
      const leafRight = document.createElement('div');
      leafRight.className = 'leaf leaf-right';
      
      flower.appendChild(stem);
      flower.appendChild(leafLeft);
      flower.appendChild(leafRight);
      
      flowerContainer.style.position = 'absolute';
      flowerContainer.style.left = positions[i].x;
      flowerContainer.style.top = positions[i].y;
      flowerContainer.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
      
      flowerContainer.appendChild(flower);
      garden.appendChild(flowerContainer);
      
      gsap.from(flowerContainer, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: "back.out(1.7)"
      });
    }
    
    container.appendChild(garden);
    this.createFloatingParticles(garden);
  }

  private createHeartAnimation(container: HTMLElement) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.fontSize = '80px';
    container.appendChild(heart);
  }

  private createFireworksAnimation() {
    this.launchFireworks();
  }

  private createMessageAnimation(container: HTMLElement) {
    const message = document.createElement('div');
    message.style.fontSize = '40px';
    message.style.lineHeight = '1.5';
    container.appendChild(message);
    
    const text = '✨🌟✨';
    gsap.to(message, {
      innerHTML: text,
      duration: 1,
      ease: "none",
      repeat: -1
    });
  }

  private createFloatingParticles(container: HTMLElement) {
    const particleCount = 15;
    const colors = ['#FFB6C1', '#DDA0DD', '#FFE4E1', '#E6E6FA'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
      `;
      
      container.appendChild(particle);
      
      gsap.to(particle, {
        x: 'random(-100, 100)',
        y: 'random(-100, 50)',
        opacity: 'random(0.3, 0.6)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1
      });
    }
  }

  private launchFireworks() {
    const duration = 3000;
    const interval = 300;
    let timeElapsed = 0;
    
    const timer = setInterval(() => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 }
      });
      
      timeElapsed += interval;
      if (timeElapsed >= duration) {
        clearInterval(timer);
      }
    }, interval);
  }
}
